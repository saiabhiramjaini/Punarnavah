import { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Recycle,
  Lightbulb,
  Handshake,
  ShoppingBag,
  LogOut,
  User as UserIcon,
  Plus,
  TrendingUp,
  Package,
  ChevronRight,
} from "lucide-react";
import { UserType } from "@abhiram2k03/punarnavah-common";
import { backendUrl } from "../utils/config";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LoadingComp } from "../components/LoadingComp";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabValue = "dashboard" | "waste-requests" | "my-creations" | "contributions" | "orders";

export const ProfilePage = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabValue>("dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/user`);
        setUserData(response.data.validatedUserData);
      } catch (err: any) {
        if (err.response?.status === 401) {
          toast.error("Unauthorized access. Please login to continue.");
          localStorage.removeItem("token");
          navigate("/signin");
        }
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/v1/auth/logout`);
      localStorage.removeItem("token");
      navigate("/signin");
      toast.success("Logged out successfully");
    } catch (err: any) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <LoadingComp />
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "waste-requests", label: "Waste Requests", icon: Recycle },
    { id: "my-creations", label: "My Creations", icon: Lightbulb },
    { id: "contributions", label: "Contributions", icon: Handshake },
    { id: "orders", label: "Order History", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* Sidebar / Desktop */}
        <aside className="w-full lg:w-80 bg-card border-r border-border hidden lg:flex flex-col">
          <div className="p-8 border-b border-border bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                {userData?.username?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base truncate leading-tight">{userData?.username}</h2>
                <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{userData?.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabValue)}
                  className={`w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "group-hover:text-primary transition-colors"}`} />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-8 space-y-4">
              <p className="text-[11px] font-black text-black uppercase tracking-[0.2em] px-5">Actions</p>
              <div className="px-4 space-y-3">
                <button
                  onClick={() => navigate('/upload-req')}
                  className="w-full h-12 flex items-center gap-3 px-5 rounded-[12px] bg-white text-black font-bold border-2 border-[#888] hover:bg-muted transition-all active:scale-[0.98]"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-sm">Post New Material</span>
                </button>

                <button
                  onClick={() => navigate('/upload-innovative-prod')}
                  className="w-full h-12 flex items-center gap-3 px-5 rounded-[12px] bg-white text-black font-bold border-2 border-[#888] hover:bg-muted transition-all active:scale-[0.98]"
                >
                  <ShoppingBag className="w-5 h-5 text-black" />
                  <span className="text-sm">Upload  Product</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-border bg-muted/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sub-Nav */}
        <div className="lg:hidden border-b border-border bg-card overflow-x-auto no-scrollbar">
          <div className="flex p-3 min-w-max gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabValue)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto bg-muted/10 pb-20 lg:pb-10">
          <div className="max-w-6xl mx-auto p-6 lg:p-12 space-y-12">

            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Activities</h1>
                    <p className="font-medium text-muted-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      Welcome back, {userData?.username}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Recycle} label="Waste Requests" value={userData?.wasteRequests?.length || 0} />
                    <StatCard icon={Handshake} label="Contributions" value={userData?.contributions?.length || 0} />
                    <StatCard icon={Lightbulb} label="My Creations" value={userData?.innovativeProducts?.length || 0} />
                    <StatCard icon={ShoppingBag} label="Orders History" value={
                      (userData?.wasteReqOrders?.length || 0) +
                      (userData?.innovativeProdOrders?.length || 0) +
                      (userData?.bulkWasteOrders?.length || 0)
                    } />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Impact Card */}
                    <Card className="lg:col-span-2 border-none shadow-sm bg-card overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Eco Progress
                          </CardTitle>
                          <Badge variant="outline" className="text-[10px] font-black uppercase text-primary border-primary/20 bg-primary/5">Verified</Badge>
                        </div>
                        <CardDescription className="text-xs">Your current standing in the Punarnavah community.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sustainability Rank</p>
                              <p className="text-2xl font-black text-foreground">Eco Warrior <span className="text-primary">LVL 4</span></p>
                            </div>
                            <p className="text-xs font-bold text-primary">75% Completion</p>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Account Summary */}
                    <Card className="border-none shadow-sm bg-primary text-primary-foreground relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <UserIcon className="w-24 h-24" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">Account Info</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-0">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Username</p>
                          <p className="font-bold truncate text-lg leading-tight">{userData?.username}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">Email Address</p>
                          <p className="font-medium truncate text-sm opacity-90">{userData?.email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === "waste-requests" && (
                <SectionContainer key="waste" title="Waste Requests" icon={Recycle} desc="Active listings for materials requested for recycling.">
                  <ListView
                    data={userData?.wasteRequests || []}
                    columns={["image", "name", "price", "requiredQuantity", "remainingQuantity"]}
                    actions={(item: any) => (
                      item.remainingQuantity === 0 ? (
                        <Button
                          size="sm"
                          className="rounded-lg h-8 text-[10px] font-bold uppercase"
                          onClick={() => navigate(`/satisfied-waste/checkout/${item.id}`, {
                            state: { name: item.name, quantity: item.requiredQuantity, price: item.price }
                          })}
                        >
                          Checkout
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-[10px] text-amber-600 bg-amber-50 border-amber-200 uppercase font-black">Active</Badge>
                      )
                    )}
                  />
                </SectionContainer>
              )}

              {activeTab === "my-creations" && (
                <SectionContainer key="creations" title="My Creations" icon={Lightbulb} desc="Showcase of innovative products you've listed.">
                  <ListView
                    data={userData?.innovativeProducts || []}
                    columns={["image", "name", "price", "quantity"]}
                  />
                </SectionContainer>
              )}

              {activeTab === "contributions" && (
                <SectionContainer key="contributions" title="My Contributions" icon={Handshake} desc="Records of waste materials provided for upcycling.">
                  <ListView
                    data={userData?.contributions || []}
                    columns={["mobile", "address", "city", "state", "pincode", "quantity"]}
                  />
                </SectionContainer>
              )}

              {activeTab === "orders" && (
                <SectionContainer key="orders" title="Order Ledger" icon={ShoppingBag} desc="Complete history of your marketplace transactions.">
                  <Tabs defaultValue="innovative" className="w-full">
                    <TabsList className="bg-muted/50 p-1 mb-6 rounded-xl border border-border w-fit">
                      <TabsTrigger value="innovative" className="rounded-lg text-xs font-bold uppercase px-6">Products</TabsTrigger>
                      <TabsTrigger value="waste" className="rounded-lg text-xs font-bold uppercase px-6">Waste</TabsTrigger>
                      <TabsTrigger value="bulk" className="rounded-lg text-xs font-bold uppercase px-6">Bulk</TabsTrigger>
                    </TabsList>
                    <TabsContent value="innovative">
                      <ListView data={userData?.innovativeProdOrders || []} columns={["amount", "mobile", "address", "status"]} />
                    </TabsContent>
                    <TabsContent value="waste">
                      <ListView data={userData?.wasteReqOrders || []} columns={["amount", "mobile", "address", "status"]} />
                    </TabsContent>
                    <TabsContent value="bulk">
                      <ListView data={userData?.bulkWasteOrders || []} columns={["amount", "mobile", "address", "status"]} />
                    </TabsContent>
                  </Tabs>
                </SectionContainer>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>
    </div>
  );
};

// --- Polished Sub-components (Primary Theme) ---

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: number }) => (
  <Card className="border-none shadow-sm bg-card transition-all hover:shadow-md hover:bg-muted/30">
    <CardContent className="p-5 flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-foreground">{value.toString().padStart(2, '0')}</p>
      </div>
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
        <Icon className="w-5 h-5" />
      </div>
    </CardContent>
  </Card>
);

const SectionContainer = ({ children, title, icon: Icon, desc }: { children: React.ReactNode, title: string, icon: any, desc: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -5 }}
    className="space-y-8"
  >
    <div className="flex flex-col md:flex-row md:items-center gap-5">
      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-sm font-medium text-muted-foreground">{desc}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

const ListView = ({ data, columns, actions }: { data: any[], columns: string[], actions?: (item: any) => React.ReactNode }) => {
  if (data.length === 0) {
    return (
      <Card className="border-dashed border-2 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-card">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-bold">Nothing here yet</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-tight font-bold mt-1">Start your journey to see records here.</p>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40 border-b border-border">
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead key={col} className="h-12 text-[10px] uppercase font-black tracking-widest text-muted-foreground px-6">
                  {col.replace(/([A-Z])/g, ' $1')}
                </TableHead>
              ))}
              {actions && <TableHead className="h-12 text-[10px] uppercase font-black tracking-widest text-muted-foreground text-right pr-6">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={item.id || idx} className="h-20 hover:bg-muted/20 border-border last:border-none">
                {columns.map((col) => (
                  <TableCell key={col} className="px-6">
                    {col === "image" ? (
                      <div className="h-12 w-12 rounded-xl border border-border overflow-hidden bg-muted">
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    ) : col === "price" || col === "amount" ? (
                      <span className="font-black text-primary text-base">₹{item[col]}</span>
                    ) : col === "status" ? (
                      <Badge className={`rounded-lg px-2 py-0.5 text-[10px] font-black uppercase ${item[col] === "COMPLETED" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-primary/10 text-primary hover:bg-primary/10"
                        }`}>{item[col]}</Badge>
                    ) : (
                      <div className="flex items-center gap-1.5 min-w-[200px]">
                        <ChevronRight className="w-3 h-3 text-primary/40" />
                        <span className="text-xs font-bold text-foreground/80 lowercase first-letter:uppercase">{item[col]}</span>
                      </div>
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="text-right pr-6 whitespace-nowrap">
                    {actions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ProfilePage;

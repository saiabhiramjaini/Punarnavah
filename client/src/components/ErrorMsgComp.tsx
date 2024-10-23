interface ErrorMsgCompProps {
    error: string;
}    

export const ErrorMsgComp = ({ error }: ErrorMsgCompProps) => {
  return (
    <div>
      <p className="text-red-500 text-center text-xs">{error}</p>
    </div>
  );
}
export const formatResultData = ({ result, message }: { result: any; message?: string }) => {
  return {
    code: '00000',
    data: result,
    message: message,
  };
};

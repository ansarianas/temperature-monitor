export const jsonResponse = (statusCode: number, data: any) => ({
  statusCode,
  body: JSON.stringify({ data })
});
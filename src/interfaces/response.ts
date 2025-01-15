export interface ResponseT<T = null> {
  data: T | null;
  success: boolean;
  message: string;
  status: number;
}

export default ResponseT;

interface LoadingIndicatorProps {
  loading?: boolean;
}

export const LoadingIndicator = ({ loading }: LoadingIndicatorProps) =>
  loading ? (
    <div className="absolute inset-y-0 right-0 flex items-center pr-10">
      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  ) : null;

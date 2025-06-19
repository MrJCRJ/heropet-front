export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const formatarData = (dateString: string | undefined): string => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + offset);
    return date.toLocaleDateString("pt-BR");
  } catch {
    return "-";
  }
};

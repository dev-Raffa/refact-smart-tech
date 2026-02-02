import { getCurrentDate } from "../date/current-date";

export const downloadFileFromUrl = async (url: string, filename?: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;

    if (filename) {
      link.download = filename;
    } else {
      const urlParts = url.split('/');
      const fileFromUrl = urlParts[urlParts.length - 1].split('?')[0];
      link.download = fileFromUrl || `clientes-sistema-${getCurrentDate()}.xlsx`;
    }

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    return true;
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
    return false;
  }
};

export const downloadExcelFile = async (url: string) => {
  const filename = `clientes-sistema-${getCurrentDate()}.xlsx`;
  return await downloadFileFromUrl(url, filename);
};
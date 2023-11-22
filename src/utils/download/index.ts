interface DownloadProps {
  blob: Blob;
  filename: string;
}

export const download = ({ blob, filename }: DownloadProps) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${filename}.txt`;
  link.href = url;
  return link.click();
};

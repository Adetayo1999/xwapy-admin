import { UploadIcon } from "@/assets/icons/upload-icon";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

export interface Iaccept {
  [key: string]: string[];
}

type Props = {
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  accept: Iaccept;
  open?: () => void;
  supportFormatText?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  showText?: boolean;
  className?: string;
};

function Dropzone({
  onDrop,
  accept,
  open,
  supportFormatText,
  name,
  disabled,
  required,
  className,
  showText = true,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    disabled,
  });

  return (
    <div className="">
      <div
        {...getRootProps({
          className: `min-h-[5.875rem] flex justify-center items-center p-6   border border-dashed bg-[#F6F6F6]  rounded ${className}`,
        })}
      >
        <input className="input-zone" {...getInputProps({ name, required })} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <div>
              <span className="flex items-center justify-center">
                <UploadIcon scale={0.9} />
              </span>
              {showText && (
                <div className="mt-7 flex flex-col gap-y-2.5">
                  <div className="flex items-center justify-center gap-x-1 text-[0.625rem] font-bold">
                    <p className="text-geay-10">Drag & drop files or </p>
                    <button
                      type="button"
                      onClick={open}
                      className="border-b border-purple-450 leading-none text-purple-450"
                    >
                      Browse
                    </button>
                  </div>
                </div>
              )}
              {supportFormatText ? (
                <p className="text-gray-420 mt-2.5 text-xs leading-4.5">
                  {supportFormatText}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dropzone;

export default function LoadingSpinner() {
    return (
      // <div className="flex justify-center items-center absolute bg-neutral-900 rounded-full p-4">
      //   <div className="w-6 h-6 border-4 border-[#4AFF50] border-t-transparent rounded-full animate-spin"></div>
      // </div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#4AFF50]"></div>
      </div>
    );
}  
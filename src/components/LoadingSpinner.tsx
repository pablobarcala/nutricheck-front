export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center absolute bg-neutral-900 rounded-full p-4">
        <div className="w-6 h-6 border-4 border-[#4AFF50] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
}  
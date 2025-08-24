export default function Toaster({ icon, msg, col, tran }) {
    return (
        <div
            className={`rounded fixed bottom-5 left-5 w-max flex justify-between items-center gap-2 py-2 px-1 bg-${col}-200 border border-2 border-${col}-500 text-${col}-500 transition-all duration-1000 ${tran} z-30`}
        >
            <i className={`p-2 bg-${col}-300 rounded-[30%/30%] ${icon}`}></i>
            {msg}
        </div>
    );
}

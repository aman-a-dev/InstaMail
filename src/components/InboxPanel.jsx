export default function InboxPanel({ messages }) {
    return (
        <div className='bg-white shadow rounded p-4 max-full mx-auto min-h-[300px] mb-6'>
            <h2 className='text-lg font-semibold mb-2'>Inbox</h2>
            {messages.length === 0 ? (
                <>
                    <div class='flex flex-col items-center'>
                        <i class='fa-solid fa-face-smile-beam text-5xl text-yellow-300 mb-3'></i>
                        <p className='text-gray-500'>No messages yet...</p>
                    </div>
                </>
            ) : (
                <ul>
                    {messages.map(msg => (
                        <li
                            key={msg.id}
                            className='border-b py-2 flex flex-col gap-3'
                        >
                            <span className="font-black text-2xl">
                                <b>From:</b> {msg.from.address}
                                {/*******?*/}
                            </span>
                            <span>
                                <b>Subject:</b> {msg.subject}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

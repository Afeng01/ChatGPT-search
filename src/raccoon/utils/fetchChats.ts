import { Chat, Chats } from "../types"
import { extractChat } from "./extractChats"

// 获取当前域名
function getCurrentDomain() {
    return window.location.hostname;
}

export async function fetchChats(page: number, auth: string) {
    const currentDomain = getCurrentDomain();
    const baseUrl = `https://${currentDomain}`;
    
    const res = await fetch(`${baseUrl}/backend-api/conversations?offset=${page * 100}&limit=100&order=updated&expand=true`, {
        headers: {
            'Authorization': auth
        }
    })
    if (!res.ok) throw Error('Failed')
    const json = await res.json()
    const chats: Chat[] = []
    for (let item of json.items) {
        try {
            const chat = extractChat(item)
            if (chat) chats.push(chat)
        } catch (err) { }
    }

    return {
        chats,
        indexed: Date.now(),
        page,
        hasMore: (page + 1) * 100 < json.total,
        maxPages:  Math.ceil(json.total / 100)
    } satisfies Chats
}
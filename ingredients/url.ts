export const URLs: Record<string, string> = {
    local:
        typeof window === "undefined"
            ? (process.env.API_INTERNAL_URL || "http://back:8000")
            : "/api", // 브라우저에서는 Nginx가 /api를 낚아채서 처리

    movies: "https://nomad-movies.nomadcoders.workers.dev/movies",
};

// export const URLs: Record<string, string> = { // Record 잘 기억하기
//     // "local": 'http://127.0.0.1:8000',
//     local: `${process.env.NEXT_PUBLIC_API_URL}/api` || 'http://127.0.0.1:8000',
//     "movies": "https://nomad-movies.nomadcoders.workers.dev/movies",
// }


const singer = {
    name: "DAY6",
    members: ["박성진", "박제형", "강영현", "김원필", "윤도운"],
    songs: [
        {
            title: "Sweet Chaos",
            year: 2019,
        },
        {
            title: "버릇이 됐어",
            year: 2015,
        },
    ],
};

console.log(singer.members[3]);
console.log(singer.songs[1].title);

// JSON object -> string(http, tcp/ip)
const str = JSON.stringify(singer);
console.log(str);

// string -> JSON object
console.log(JSON.parse(str));
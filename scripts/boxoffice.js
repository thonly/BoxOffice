const BoxOffice = artifacts.require("BoxOffice");

// const owner = web3.eth.accounts[0];

const movies = [
    {
        salesEndTime: Date.now()/1000 + 28*60*60*24 | 0,
        price: web3.toWei(1, "finney"),
        ticketSupply: web3.toWei(1, "ether"),
        movieName: "Casablanca",
        ticketSymbol: "CSBC",
        logline: "An American expatriate meets a former lover, with unforeseen complications.",
        poster: "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg",
        trailer: "https://www.imdb.com/title/tt0034583"
    
    }, // Casablanca
    {
        salesEndTime: Date.now()/1000 + 28*60*60*24 | 0,
        price: web3.toWei(1, "finney"),
        ticketSupply: web3.toWei(1, "ether"),
        movieName: "Casablanca",
        ticketSymbol: "CSBC",
        logline: "An American expatriate meets a former lover, with unforeseen complications.",
        poster: "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg",
        trailer: "https://www.imdb.com/title/tt0034583"
    }, // Titanic
    {
        salesEndTime: Date.now()/1000 + 28*60*60*24 | 0,
        price: web3.toWei(1, "finney"),
        ticketSupply: web3.toWei(1, "ether"),
        movieName: "Casablanca",
        ticketSymbol: "CSBC",
        logline: "An American expatriate meets a former lover, with unforeseen complications.",
        poster: "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg",
        trailer: "https://www.imdb.com/title/tt0034583"
    }, // Avatar
    {
        salesEndTime: Date.now()/1000 + 28*60*60*24 | 0,
        price: web3.toWei(1, "finney"),
        ticketSupply: web3.toWei(1, "ether"),
        movieName: "Casablanca",
        ticketSymbol: "CSBC",
        logline: "An American expatriate meets a former lover, with unforeseen complications.",
        poster: "https://en.wikipedia.org/wiki/Casablanca_(film)#/media/File:CasablancaPoster-Gold.jpg",
        trailer: "https://www.imdb.com/title/tt0034583"
    } // Finding Nemo
];

module.exports = async callback => {

    // await movies.map(movie => BoxOffice.deployed().then(boxOffice => boxOffice.makeFilm(movie.salesEndTime, movie.price, movie.ticketSupply, movie.movieName, movie.ticketSymbol, movie.logline, movie.poster, movie.trailer))
    // .then(tx => console.log(tx)));

    await BoxOffice.deployed().then(boxOffice => boxOffice.makeFilm(movies[0].salesEndTime, movies[0].price, movies[0].ticketSupply, movies[0].movieName, movies[0].ticketSymbol, movies[0].logline, movies[0].poster, movies[0].trailer))
       .then(tx => console.log(tx));

    // await BoxOffice.deployed().then(boxOffice => boxOffice.films(0)).then(film => console.log(film));

    callback();
};
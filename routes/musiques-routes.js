const express = require('express')
const router = express.Router()

let MUSIQUES = [
    {
      id: "1",
      auteur: "Daft punk",
      annee: "2013",
      titre: "Get lucky",
      imageUrl:
        "https://www.clashmusic.com/wp-content/uploads/2018/04/get_lucky_daft_punk_by_rothdog-d62aa4m-scaled.jpg",
    },
    {
      id: "2",
      auteur: "David Guetta feat Sia",
      annee: "2011",
      titre: "Titanium",
      imageUrl:
        "https://i.discogs.com/LGuCJBxtHcFjjHiE1q_VTF1iWZLJZO1sxkwQOKrhFgg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM1OTc1/MzgtMTMzNjc5Njkx/Ni02NTA4LmpwZWc.jpeg",
    },
    {
      id: "3",
      auteur: "Shaka Ponk",
      annee: 2019,
      titre: "Smells like teen spirits",
      imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg",
    },
    {
      id: "4",
      auteur: "Imagine Dragon",
      annee: 2018,
      titre: "Natural",
      imageUrl:
        "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg",
    },
  ];


// respond with "hello world" when a GET request is made to the homepage
router.get('/', (req, res) => {
    console.log('Liste des musiques')
//   res.send('Liste des musiques')
res.json({message: {MUSIQUES}})
})

router.get('/:musiqueid', (req, res) => {
    console.log('GetMusiqueByID')
    const mId = req.params.musiqueid;
    console.log({mId});
    const musique = MUSIQUES.find(m => {
        return m.id === mId;
    })
    if (!musique){
        return res.status(404).json({"Musique" : "Musique non trouvée pour cet Id."})
    }
//   res.send('Liste des musiques')
res.json({message: {musique}})
})

  module.exports = router;
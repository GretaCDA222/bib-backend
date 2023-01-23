// const uuid = require("uuid");
// const mongoose = require('mongoose')
const Musique = require("../models/musique");

const HttpError = require('../utils/http-error');

// let MUSIQUES = [
// {
//   id: "1",
//   auteur: "Daft punk",
//   annee: "2013",
//   titre: "Get lucky",
//   imageUrl:
//     "https://www.clashmusic.com/wp-content/uploads/2018/04/get_lucky_daft_punk_by_rothdog-d62aa4m-scaled.jpg",
// },
//   {
//     id: "2",
//   auteur: "David Guetta feat Sia",
//   annee: "2011",
//   titre: "Titanium",
//   imageUrl:
//     "https://i.discogs.com/LGuCJBxtHcFjjHiE1q_VTF1iWZLJZO1sxkwQOKrhFgg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM1OTc1/MzgtMTMzNjc5Njkx/Ni02NTA4LmpwZWc.jpeg",
// },
//   {
//     id: "3",
//   auteur: "Shaka Ponk",
//   annee: 2019,
//   titre: "Smells like teen spirits",
//   imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg",
// },
//   {
//     id: "4",
//   auteur: "Imagine Dragon",
//   annee: 2018,
//   titre: "Natural",
//   imageUrl:
//     "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg",
// },
// ];

const getMusiques = async (req, res, next) => {
  // res.json({ MUSIQUES });
  let musiques;
  try {
    musiques = await Musique.find();
  } catch (err) {
    // console.log({ err });
    const error = new HttpError('Erreur lors de la récupération de la liste', 500)
    return next(error)
  }
  res.json({ musiques: musiques.map((m) => m.toObject({ getters: true })) });
};

const getMusiqueById = async (req, res, next) => {
  // console.log("GetMusiqueByID");
  const mId = req.params.musiqueid;
  // console.log({ mId });
  let musique;
  try {
    musique = await Musique.findById(mId);
  } catch (err) {
     const error = new HttpError('Erreur lors de la récupération de la musique', 500)
    return next(error)
  }

  if (!musique) {
    const error = new HttpError('Musique non trouvée pour cet Id.', 404)
    return next(error)
  }
  //   res.send('Liste des musiques')
  res.json({ musique: musique.toObject({ getters: true }) });
};

const createMusique = async (req, res) => {
  // console.log(req.body)
  const { auteur, annee, titre, imageUrl } = req.body;
  const createdMusique = new Musique({
    // id: uuid.v4(),
    auteur,
    annee,
    titre,
    imageUrl,
  });
  // console.log({createdMusique})
  // MUSIQUES.push(createdMusique);
  try {
    await createdMusique.save();
  } catch (err) {
    const error = new HttpError('Erreur lors de l\'enregistrement de la musique', 500)
    return next(error)
  }

  res.status(201).json({ musique: createdMusique });
};

const updateMusique = async (req, res) => {
  const { auteur, annee, titre, imageUrl } = req.body;
  const musiqueId = req.params.musiqueid;

  let musique;
  try {
    musique= await Musique.findById(musiqueId)
  } catch (err) {
    const error = new HttpError('Erreur lors de la mise à jour de la musique', 500)
    return next(error)
  }

  musique.auteur = auteur;
  musique.annee = annee;
  musique.titre = titre;
  musique.imageUrl = imageUrl;

  try {
    await musique.save();
  } catch (err) {
    const error = new HttpError('La maj de la musique n\a pas fonctionnée. Veuillez recommencer...', 500)
    return next(error)
  }

  res.status(200).json({ musique: musique.toObject({getters: true}) });
};

const deleteMusique = async (req, res) => {
  const musiqueId = req.params.musiqueid;
  // MUSIQUES = MUSIQUES.filter((m) => m.id !== musiqueId);

  let musique;
  try {
    musique = Musique.findById(musiqueId)
  } catch (err) {
    const error = new HttpError('Erreur lors de la suppression de la musique', 500)
    return next(error)
  }

  if(!musique){
    const error = new HttpError('Aucune musique trouvée pour cet id', 404)
    return next(error)
  }

  try {
    await musique.remove()
  } catch (err) {
    const error = new HttpError('La suppression de la musique n\'apas fonctionnée. Veuillez recommencer ...', 500)
    return next(error)
  }

  res.status(200).json({ message: "Musique supprimée !" });
};

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
exports.deleteMusique = deleteMusique;

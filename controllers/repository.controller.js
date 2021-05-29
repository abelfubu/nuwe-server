const Repository = require('../models/repository.model');
const User = require('../models/user.model');

exports.createRepo = async (req, res) => {
    let {userId} = req.params;

    req.body.stack = JSON.parse(req.body.stack);
    req.body.author = userId;

    let repo = new Repository(req.body);

    
    await repo.save(async (err, repo) => {
        if (err) {
            return res.status(400).json({
              error: 'Something went wrong',
            });
        }

        await User.findByIdAndUpdate(
            {_id: userId}, 
            {$inc: { repos: 1 }}).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                      error: "Couldn't update user",
                    });
                }

                res.json(repo);
        });
    });
}

exports.getOneRepo = async (req, res) => {
    let {repoId} = req.params;

    await Repository.findById(repoId).exec((err, repo) => {
        if (err || !repo) {
            return res.status(400).json({
              error: 'Repository Not Found',
            });
        }

        res.json(repo);
    })
}

exports.getReposFromUser = async (req, res) => {
    let {userId} = req.params;

    await Repository.find({author: userId}).exec((err, repos) => {
        if (err) {
            return res.status(400).json({
              error: 'Something went wrong',
            });
        }

        if (repos.length == 0) {
            res.json({message: 'No repositories were found for this user'})
        } else {
            res.json(repos);
        }
    })
}

exports.getAllRepos = async (req, res) => {
    await Repository.find().exec((err, repos) => {
        if (err) {
            return res.status(400).json({
              error: 'Something went wrong',
            });
        }

        if (repos.length == 0) {
            res.json({message: 'No repositories were found'})
        } else {
            res.json(repos);
        }
    })
}

exports.updateRepo = async (req, res) => {
    let {repoId} = req.params;

    await Repository.findByIdAndUpdate({_id: repoId}, {$set: req.body}, {new: true}, (err, repo) => {
        if (err || !repo) {
            return res.status(400).json({
              error: "Repository couldn't be updated",
            });
        }

        res.json(repo);
    });
}

exports.deleteRepo = async (req, res) => {
    let {repoId} = req.params;

    await Repository.findByIdAndDelete({_id: repoId}, async (err, repo) => {
        if (err || !repo) {
            return res.status(400).json({
              error: "Repository couldn't be deleted",
            });
        }

        await User.findByIdAndUpdate(
            {_id: repo.author}, 
            {$inc: { repos: -1 }}).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                      error: "Couldn't update user",
                    });
                }

                res.json({message: 'Repository succesfully deleted', repo});
        });

    })
}
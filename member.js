function skillsMember()
{
    var member = require('../models/member');
    var skill = require('../models/skill');
    var memberSkill = require('../models/memberSkill');
    var memberSkillHistory = require('../models/memberSkillHistory');
    var memberSkillHistoryController = require('../controllers/memberSkillHistory');
    var memberController = require('../controllers/member');
    var skillController = require('../controllers/skill');
    var memberSkillController = require('../controllers/memberSkill');
    var skillController = require('../controllers/skill');
    var async = require('async');
    var moment = require('moment');

    var member = new member();
    var skill = new skill();
    var memberSkill = new memberSkill();
    var memberSkillHistory = new memberSkillHistory();

    var memberSkillHistoryController = new memberSkillHistoryController();
    var memberController = new memberController();
    var skillController = new skillController();
    var memberSkillController = new memberSkillController();
    var skillController = new skillController();

    this.getSkills = function (req, res, next)
    {
        var memberId = req.params.memberId;
        var memberSkills = [];
        var skills = [];

        async.series([
            function (callback)
            {
                memberSkillController.getMemberSkills(memberId, function (err, data)
                {
                    if (err)
                    {
                        return callback(err);
                    }

                    memberSkills = data;
                    callback();
                });
            },
            function (callback)
            {
                skillController.getSkills(function (err, data)
                {
                    if (err)
                    {
                        return callback(err);
                    }

                    skills = data;
                    callback();
                });
            }
        ],
        function (err)
        {
            if (err)
            {
                return next(err);
            }

            res.render('skills', { memberSkills: memberSkills, skills: skills });
        });
    };

    this.addSkill = function (req, res, next)
    {
        var memberId = req.params.memberId;
        var skillId = req.body.skillId;
        var skillLevel = req.body.skillLevel;

        var memberSkill = new memberSkill();
        memberSkill.memberId = memberId;
        memberSkill.skillId = skillId;
        memberSkill.skillLevel = skillLevel;

        async.series([
            function (callback)
            {
                memberSkillController.addMemberSkill(memberSkill, function (err, data)
                {
                    if (err)
                    {
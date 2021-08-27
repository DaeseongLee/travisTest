const httpMocks = require('node-mocks-http');

const Challenge = require('../../models/challenge');
const Challenge_Exercise = require('../../models/challenge_exercise');
const Challenge_Set = require('../../models/challenge_set');
const Challenge_User = require('../../models/challenge_user');
const User = require('../../models/user');
const challengeController = require('../../controllers/challenge');

const challengeData = require('../data.json');

describe('ChallengeRoutes', () => {
  let req;
  let res;
  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('전체 challenge 가져오기', () => {
    Challenge.findAll = jest.fn();

    it('allChallenge는 함수이어야 함', () => {
      expect(typeof challengeController.allChallenge).toBe('function');
    });
    it('allChallenge에서 findAll함수가 한번 호출 되어야 함', async () => {
      await challengeController.allChallenge(req, res);
      expect(Challenge.findAll).toBeCalledTimes(1);
    });
    it('allChallenge에서 정상적으로 findAll함수가 호출 되었을 때, res는 200상태를 응답해야함', async () => {
      await challengeController.allChallenge(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('allChallenge에서 비정상적으로 findAll함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      Challenge.findAll = jest.fn(() => {
        throw new Error();
      });
      await challengeController.allChallenge(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('사용자별 참가 전 challenge 가져오기', () => {
    it('challengeForUserBeforeJoin는 함수이어야 함', () => {
      expect(typeof challengeController.challengeForUserBeforeJoin).toBe(
        'function'
      );
    });
    it('challengeForUserBeforeJoin에서 findAll함수가 한번 호출 되어야 함', async () => {
      await challengeController.challengeForUserBeforeJoin(req, res);
      expect(Challenge_User.findAll).toBeCalledTimes(1);
    });
    it('challengeForUserBeforeJoin에서 정상적으로 findAll함수가 호출 되었을 때, res는 200상태를 응답해야함', async () => {
      await challengeController.challengeForUserBeforeJoin(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('challengeForUserBeforeJoin에서 비정상적으로 findAll함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      Challenge_User.findAll = jest.fn(() => {
        throw new Error();
      });
      await challengeController.challengeForUserBeforeJoin(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('사용자별 마감 후 challenge 가져오기', () => {
    Challenge_User.findAll = jest.fn();

    it('challengeForUserAfterJoin는 함수이어야 함', () => {
      expect(typeof challengeController.challengeForUserAfterJoin).toBe(
        'function'
      );
    });
    it('challengeForUserAfterJoin에서 findAll함수가 한번 호출 되어야 함', async () => {
      await challengeController.challengeForUserAfterJoin(req, res);
      expect(Challenge_User.findAll).toBeCalledTimes(1);
    });
    it('challengeForUserAfterJoin에서 정상적으로 findAll함수가 호출 되었을 때, res는 200상태를 응답해야함', async () => {
      await challengeController.challengeForUserAfterJoin(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('challengeForUserAfterJoin에서 비정상적으로 findAll함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      Challenge_User.findAll = jest.fn(() => {
        throw new Error();
      });
      await challengeController.challengeForUserAfterJoin(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('챌린지별 상세 데이터 가져오기', () => {
    Challenge_User.findOne = jest.fn();
    Challenge.findOne = jest.fn();
    it('getChallengeDetail는 함수이어야 함', () => {
      expect(typeof challengeController.getChallengeDetail).toBe('function');
    });
    it('getChallengeDetail에서 findOne함수가 한번씩 호출 되어야 함', async () => {
      await challengeController.getChallengeDetail(req, res);
      expect(Challenge_User.findOne).toBeCalledTimes(1);
      expect(Challenge.findOne).toBeCalledTimes(1);
    });
    it('getChallengeDetail에서 정상적으로  findOne함수가 호출 되었을 때, res는 200상태를 응답해야함', async () => {
      req.params = { challengeId: 1 };
      await challengeController.getChallengeDetail(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('getChallengeDetail에서 비정상적으로  findOne함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      Challenge_User.findOne = jest.fn(() => {
        throw new Error();
      });
      await challengeController.getChallengeDetail(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('챌린지 등록하기', () => {
    beforeEach(() => {
      Challenge.create = jest.fn();
      Challenge_Exercise.create = jest.fn();
      Challenge_Set.create = jest.fn();
      Challenge.create.mockReturnValue({ id: 1 });
      Challenge_Exercise.create.mockReturnValue({ id: 1 });
      Challenge_Set.create.mockReturnValue({ id: 1 });
    });

    it('makeChallenge는 함수이어야 함', () => {
      expect(typeof challengeController.makeChallenge).toBe('function');
    });
    it('makeChallenge에서 create 함수가 호출되어야 함', async () => {
      req.body = challengeData;
      await challengeController.makeChallenge(req, res);
      expect(Challenge.create).toBeCalledTimes(1);
      expect(Challenge_Exercise.create).toBeCalledTimes(
        challengeData.exercises.length
      );
      expect(Challenge_Set.create).toBeCalledTimes(2);
    });
    it('makeChallenge가 정상적이면 res는 200상태를 응답해야함', async () => {
      await challengeController.makeChallenge(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('makeChallenge에서 비정상적으로  findOne함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      req.body = null;
      await challengeController.makeChallenge(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('챌린지 기록하기', () => {
    beforeEach(() => {
      User.findByPk = jest.fn();
      User.update = jest.fn();
      User.findByPk.mockReturnValue({ id: 1, stamp: 0 });
    });

    it('makeRecord는 함수이어야 함', () => {
      expect(typeof challengeController.makeRecord).toBe('function');
    });
    it('makeRecord에서 findbk, update 함수가 호출되어야 함', async () => {
      await challengeController.makeRecord(req, res);
      expect(User.findByPk).toBeCalledTimes(1);
      expect(User.update).toBeCalledTimes(1);
    });
    it('makeRecord가 정상적이면 res는 200상태를 응답해야함', async () => {
      await challengeController.makeRecord(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('makeRecord에서 비정상적으로  findOne함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      User.findByPk.mockReset();
      await challengeController.makeRecord(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('챌린지 참여하기', () => {
    beforeEach(() => {
      Challenge_User.findOne = jest.fn();
      Challenge_User.findOne.mockReturnValue({ id: 1 });
      Challenge_User.create = jest.fn();
      req.params = { challengeId: 1 };
    });

    it('joinChallenge는 함수이어야 함', () => {
      expect(typeof challengeController.joinChallenge).toBe('function');
    });
    it('joinChallenge가 정상적이면 res는 200상태를 응답해야함', async () => {
      await challengeController.joinChallenge(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('joinChallenge에서 비정상적으로  findOne함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      req.params = {};
      await challengeController.joinChallenge(req, res);
      expect(res.statusCode).toBe(500);
    });
  });

  describe('챌린지 참여취소하기', () => {
    beforeEach(() => {
      Challenge_User.destroy = jest.fn();
      req.params = { challengeId: 1 };
    });

    it('cancelChallenge는 함수이어야 함', () => {
      expect(typeof challengeController.cancelChallenge).toBe('function');
    });
    it('cancelChallenge가 정상적이면 res는 200상태를 응답해야함', async () => {
      await challengeController.cancelChallenge(req, res);
      expect(res.statusCode).toBe(200);
    });
    it('cancelChallenge에서 비정상적으로  findOne함수가 호출 되었을 때, res는 error값을 응답해야 함', async () => {
      req.params = {};
      await challengeController.cancelChallenge(req, res);
      expect(res.statusCode).toBe(500);
    });
  });
});

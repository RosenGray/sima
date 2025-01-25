import express from 'express';

const router = express.Router();

router.post('/api/auth/signout', async (req, res) => {
  console.log('before', req.session);
  req.session = null;
  res.clearCookie('sima-auth-session');
  console.log('after', req.session);
  res.send({});
});

export default router;

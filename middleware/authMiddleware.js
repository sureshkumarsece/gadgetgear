import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log("Auth Header Received:", authHeader); // Debugging
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      console.log("Decoded User ID:", req.userId); // Debugging
      next();
    } catch (error) {
      console.error("Token Verification Failed:", error);
      return res.status(403).json({ message: 'Invalid Token' });
    }
  };
  
  export default authMiddleware;
  
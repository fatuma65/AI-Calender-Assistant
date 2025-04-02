const getUserInfo = async (accessToken: string) => {
    try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
    
        if (!response.ok) {
          throw new Error("Invalid access token");
        }
    
        const userData = await response.json();
        return userData;
      } catch (error) {
        console.log("Error verifying Google token:", error);
        return null;
      }
}
export default getUserInfo
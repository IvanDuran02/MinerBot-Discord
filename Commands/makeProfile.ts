import profileModels from "../profileSchema";
import profileSchema from "../profileSchema";

export async function makeProfile(message: any) {
  try {
    let profileData = await profileModels.findOne({
      userID: message.author.id,
    });
    if (!profileData) {
      console.log("profile being made");
      await new profileSchema({
        userID: message.author.id,
        serverID: message.guild?.id,
        gay: "undefined",
      }).save();
    }
  } catch (error) {
    console.log(error);
  }
}

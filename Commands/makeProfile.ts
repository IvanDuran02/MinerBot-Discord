import profileModels from "../profileSchema";
import profileSchema from "../profileSchema";

export async function makeProfile(message: any) {
  try {
    console.log("checking for profile");
    let profileData = await profileModels.findOne({
      userID: message.author.id,
    });
    if (!profileData) {
      console.log("profile being made");
      await new profileSchema({
        userID: message.author.id,
        serverID: message.guild?.id,
        balance: 0,
        inventory: [],
        iron: 0,
        bank: 0,
      }).save();
    }
  } catch (error) {
    console.log(error);
  }
}

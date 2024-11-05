import { Request, Response } from "express"
import { userSchema } from "../validation/validation";
import client from "../utils/client";

const registerUser = async (req: Request, res: Response) => {
    const userBody = req.body;
    const parseUserBody = userSchema.safeParse(userBody);
    try {
    if (!parseUserBody.success) {
            res.status(400).json({ error: parseUserBody.error , success:false});
            return;
    }
        const user = parseUserBody.data;
        const existingUser= await client.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (existingUser) {
            res.status(400).json({ error: "User already exists", success:false });
            return;
        }
        const newUser = await client.user.create({
            data: {
                name: user.name,
                email: user.email,
                clerkId: user.clerkId
            }
        })

        if (!newUser) {
            res.status(500).json({ error: "Error while creating user", success:false });
            return;
        }

        res.status(201).json({
            message: "User created successfully",
            data: newUser,
            success:true
        })
        return;

    } catch (error) {
        console.log(error, "Error while creating user")
        res.status(500).json({ error: "Internal server error", success:false });
        return;
    }

}

export { registerUser }
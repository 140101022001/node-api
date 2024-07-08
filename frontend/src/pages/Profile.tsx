import useUser from "../hooks/useUser"

const Profile = () => {
    const {user} = useUser();
    return (
        <div>
            Name: {user.name}
        </div>
    )
}

export default Profile
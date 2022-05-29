import React, { useContext } from "react";
import { UserContext } from "../../App";
import {
  Container,
  BannerImg,
  ProfileImg,
  Name,
  ContainerWrapper,
  Content,
} from "./ProfileStyle";

const Profile = () => {
  const [user] = useContext(UserContext);

  return (
    <ContainerWrapper>
      <Container>
        <BannerImg />
        <ProfileImg
          src="https://res.cloudinary.com/multiverse/image/upload/v1653829641/xc3lwcluk5bmsqmirs6x.jpg"
          alt="Photo"
        />
        <Name>{user ? user.name : ""}</Name>
        <hr></hr>
        <Content>{user ? user.reg_no : ""}</Content>
        <Content>{user ? user.email : ""}</Content>
        <Content>{user ? user.std : ""}</Content>
      </Container>
    </ContainerWrapper>
  );
};

export default Profile;

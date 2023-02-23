import {Avatar, Div, Icon, Text} from 'react-native-magnus';

const Profile = () => {
  return (
    <Div p="xl" shadow="sm" rounded="md">
      <Avatar alignSelf="center" bg="green800" rounded="lg" shadow={1}>
        <Icon name="user" color="white" fontFamily="Feather" />
      </Avatar>
      <Text
        fontSize="lg"
        fontWeight="bold"
        textTransform="uppercase"
        color="red400"
        letterSpacing={1}
        mt="lg"
      >
        ProfileName
      </Text>
    </Div>
  );
};

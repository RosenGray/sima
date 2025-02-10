import { Text, Box } from "@radix-ui/themes";

const EmailDisclaimer = () => {
  return (
    <Box mt="2">
      <Text size="2" color="gray">
        ** Email виден только администрации сайта и не отображается публично ** 
      </Text>
    </Box>
    // <Box>
    //   <Text size="2" color="gray">
    //     Ваш email адрес будет использоваться для:
    //   </Text>
    //   <Box mt="2" pl="3">
    //     <ul style={{ margin: 0, color: "var(--gray-11)", listStyle: "disc" }}>
    //       <li>
    //         <Text size="2">Входа на сайт</Text>
    //       </li>
    //       <li>
    //         <Text size="2">Получения личных сообщений</Text>
    //       </li>
    //       <li>
    //         <Text size="2">Уведомлений о продвижении объявления</Text>
    //       </li>
    //     </ul>
    //   </Box>
    //   <Box mt="2">
    //     <Text size="2" color="gray">
    //        ** Email виден только администрации сайта и не отображается публично.
    //     </Text>
    //   </Box>
    // </Box>
  );
};

export default EmailDisclaimer;

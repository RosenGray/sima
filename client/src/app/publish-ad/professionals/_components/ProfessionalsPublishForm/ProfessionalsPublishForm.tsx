"use client";
import {
  Heading,
  Box,
  Text,
  Select,
  TextField,
  TextArea,
  Button,
  Flex,
  Grid,
} from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
import classes from "./ProfessionalsPublishForm.module.scss";
import SelectSingle from "@/components/react-select/SelectSingle/SelectSingle";
import {
  getCitiesToSelectOptions,
  getAreasToSelectOptions,
} from "@/utils/cities";

const areas = getAreasToSelectOptions();
const cities = getCitiesToSelectOptions();
console.log("cities", cities);

export const ProfessionalsPublishForm = () => {
  return (
    <form className={classes.ProfessionalsPublishForm__Form}>
      <Grid columns="2" gap="4" mb="4">
        <Flex direction="column" gap="2">
          <Text as="label" weight="bold">
            Выберите доску*:
          </Text>
          <SelectSingle
            placeholder="Выберите доску"
            name="board"
            options={[
              { value: "13", label: "Бизнес" },
              { value: "47", label: "Взаимопомощь" },
            ]}
          />
        </Flex>

        <Flex direction="column" gap="2">
          <Text weight="bold">Город:</Text>
          <SelectSingle
            placeholder="Выберите город"
            name="city"
            options={[...areas, ...cities]}
          />
        </Flex>
      </Grid>

      <Box mb="4">
        <Text as="label" weight="bold" mb="2">
          Текст объявления:
        </Text>
        <TextArea
          placeholder="Введите текст объявления"
          className={classes.textarea}
          rows={5}
        />
      </Box>

      {/* Photo Upload */}
      <Box mb="4">
        <Text weight="bold" mb="2">
          Фотографии:
        </Text>
        <Flex direction="column" gap="2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Flex key={num} gap="2" align="center">
              <Text size="2">Фото {num}</Text>
              <Button variant="soft">
                <UploadIcon /> Выбрать файл
              </Button>
            </Flex>
          ))}
          <Text size="1" color="gray">
            Файл в формате png, jpg, bmp, gif размером не более 5 Мб
          </Text>
        </Flex>
      </Box>

      {/* Contact Information */}
      <Box mb="4">
        <Heading size="4" mb="2">
          Контактная информация
        </Heading>
        <Grid columns="2" gap="4">
          <Flex direction="column" gap="2">
            <Text weight="bold">E-mail*:</Text>
            <TextField.Root>
              {/* <TextField.Input type="email" placeholder="your@email.com" /> */}
            </TextField.Root>
          </Flex>

          <Flex direction="column" gap="2">
            <Text weight="bold">Телефон:</Text>
            <Flex gap="2">
              <Select.Root defaultValue="03">
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="02">02</Select.Item>
                  <Select.Item value="03">03</Select.Item>
                  <Select.Item value="04">04</Select.Item>
                  {/* Add more codes */}
                </Select.Content>
              </Select.Root>
              <TextField.Root className={classes.phoneInput}>
                {/* <TextField.Input placeholder="Номер телефона" /> */}
              </TextField.Root>
            </Flex>
          </Flex>
        </Grid>
      </Box>

      {/* Submit Section */}
      <Flex direction="column" gap="3" align="start">
        <Flex gap="2" align="center">
          <input type="checkbox" id="terms" />
          <Text size="2">
            Я принимаю{" "}
            <a href="/agreement" target="_blank">
              пользовательское соглашение
            </a>
          </Text>
        </Flex>
        <Button size="3" variant="solid">
          Добавить объявление
        </Button>
      </Flex>
    </form>
  );
};

export default ProfessionalsPublishForm;

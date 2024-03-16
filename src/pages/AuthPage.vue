<template>
  <q-page
    class="login-page window-height window-width row items-center justify-center"
  >
    <div class="column z-top">
      <div class="row">
        <div class="col">
          <div class="text-h4 text-white q-mt-md montserrat-medium">
            UniLecta
          </div>
          <div class="text-body-2 text-white q-mb-xs" style="margin-top: -7px">
            {{ !isRegistrRef ? "Регистрация" : "Авторизация" }}
          </div>
        </div>
      </div>
      <q-form class="row" @submit="submitForm" ref="form" tabindex="-1">
        <q-card class="q-pa-lg shadow-3 login-card" bordered="bordered">
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                label="Имя"
                v-if="!isRegistrRef"
                type="text"
                v-model="name"
                outlined
                color="black"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>
              <q-input
                :label="
                  !isRegistrRef ? 'Придумайте логин' : 'Введите ваш логин'
                "
                outlined
                lazy-rules="lazy-rules"
                type="login"
                v-model="login"
                color="black"
              >
                <template v-slot:prepend>
                  <q-icon name="face" />
                </template>
              </q-input>
              <q-input
                :type="showPassword ? 'text' : 'password'"
                @keydown.enter.prevent="submitForm"
                label="Пароль"
                v-model="password"
                outlined
                label-color="black"
                color="black"
              >
                <template v-slot:prepend>
                  <q-icon name="password"></q-icon>
                </template>
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    name="visibility_off"
                    @click="showPassword = !showPassword"
                  ></q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-actions class="q-px-md text-primary">
            <q-btn
              class="gradient-btn full-width"
              :label="!isRegistrRef ? 'Зарегистрироваться' : 'Войти'"
              size="lg"
              type="submit"
              unelevated="unelevated"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const quasar = useQuasar();
const router = useRouter();
const form = ref(null);
const login = ref("");
const password = ref("");
const showPassword = ref(false);
const name = ref("");

const isRegistrRef = ref(false);

const passRules = [
  (val) => !!val || "Введите пароль",
  (val) => val.length >= 6 || "Пароль должен быть не менее 6 символов",
];

const profile = computed(() => authStore.getProfile);

const submitForm = async () => {
  form.value.validate(true).then(async () => {
    try {
      if (!isRegistrRef.value) {
        await authStore.registration(name.value, login.value, password.value);
      } else {
        await authStore.login(login.value, password.value);
      }
    } catch (e) {
      Notify.create({ message: "Error" });
    }
  });
};
onMounted(() => (isRegistrRef.value = authStore.isAuthenticated));
</script>

<style scoped lang="scss">
.login-card {
  opacity: 0.98;

  width: 50rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-page {
  background: $info;
}
.gradient-btn {
  box-sizing: content-box;
  border: double 4px transparent;
  border-radius: 20px;
  background-image: linear-gradient(white, white),
    linear-gradient(130deg, #696984 10%, $info 100%);
  /*border-image: linear-gradient( 130deg, #FDA219 10%, #E80505 100%) 1;*/
  padding: 10px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  color: $dark;
}
</style>

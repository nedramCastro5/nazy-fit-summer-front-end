<script setup>
import BreadCrumb from '@/components/components-parts/BreadCrumb.vue';
import { useAuthentication } from '@/composable/useAuthentication';

const userDetails = JSON.parse(localStorage.getItem('userDetails'))

const {handleLogout, error} = useAuthentication();

const logout = () => {
    handleLogout();
}
</script>

<template>
  <main>
    <BreadCrumb :page="''"/>
    <div class="wrapper">
      <div class="user-data">
        <h2>Minha conta</h2>
        <div class="edit">
          <p><strong>Dados pessoais</strong></p>
          <RouterLink to="/edit">Editar</RouterLink>
        </div>
        <div class="info">
          <p>{{ userDetails.fullName }}</p>
          <p>{{ userDetails.email }}</p>
        </div>
        <a class="logout" v-on:click="logout()">Sair</a>
      </div>
      <div class="shop">
        <p>Realize sua primeira compra!</p>
        <button><RouterLink to="/">Ir para a loja</RouterLink></button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 0 10%;
  margin-top: 20px;
  margin-bottom: 50px;
}

main .wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.user-data {
  flex: 1 1 300px;
}

.user-data .edit {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 250px;
  margin-bottom: 10px;
}

.user-data .info {
  margin-bottom: 20px;
}

p {
  margin: 0;
}

a{
    color: white;
    text-decoration: none;
}

.logout {
  margin-top: 10px;
  display: inline-block;
  color: #e0406a;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.shop {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.shop button {
  border: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #e0406a;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  main {
    padding: 0 5%;
  }

  main .wrapper {
    flex-direction: column;
  }

  .shop, .user-data {
    width: 100%;
  }

  .user-data .edit {
    max-width: 100%;
  }
}
</style>
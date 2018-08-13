<script>
export default {
    data(){
        return {
            token: '',
            error: false,
            loading: false
        }
    },
    methods: {
        check() {
            this.loading = true;
            this.$http.jsonp(
                'https://api.vk.com/method/users.get', {
                    params: {
                        v: '5.80',
                        access_token: this.token,
                        count: 50,
                    }
            }).then(response => {
                this.loading = false;
                if( response.body.error) {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 1000);
                } else {
                    this.$store.commit('setToken', this.token);
                }
            });
        }
    }
}
</script>

<template>
    <form class="login-form" method="post" @submit.prevent="check()" :class="{'login-form_error': error}">
        <img src="./../assets/svg/logo.svg" alt="" class="vk-logo">
        <label for="token">Введите access token приложения</label>
        <input type="text" id="token" v-model="token" placeholder="Access token" autofocus class="login-form__code-input">
        <button type="submit" class="login-form__submit-button">
            <template v-if="loading">
                <div class="preloader">
                    <div class="preloader__dot"></div>
                    <div class="preloader__dot"></div>
                    <div class="preloader__dot"></div>
                </div>
            </template>
            <template v-else>Войти</template>
        </button>
    </form>
</template>

<style scoped>
    body {
        background-image: url('../../img/vk-background.png');
    }

    .vk-logo {
        max-width: 150px;
        align-self: center;
    }
    .login-form {
        display: flex;
        flex-direction: column;
        background: #fff;
        padding: 30px;
        margin: auto;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
        border-radius: 5px;
    }
    .login-form__code-input {
        border: 1px solid #d3d9de;
        border-radius:5px;
        font-size: 19px;
        padding: 15px 20px;
        margin: 15px 0;
        outline: 0;
    }
    .login-form__submit-button {
        background-color: var(--vk-color);
        border:0;
        color:#fff;
        cursor: pointer;
        font-size: 19px;
        font-weight: 400;
        padding: 12px 24px;
        border-radius: 100px;
        display: inline-block;
        outline: none;
    }
    .login-form__submit-button:hover,
    .login-form__submit-button:focus {
        background-color: var(--vk-color);
        opacity: .9;
    }

    .login-form_error {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>

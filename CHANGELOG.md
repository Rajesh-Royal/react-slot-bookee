# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/Rajesh-Royal/react-slot-bookee/compare/v1.0.0...v1.1.0) (2022-07-05)


### Features

* aliases import support for styles are added ([9f4385d](https://github.com/Rajesh-Royal/react-slot-bookee/commit/9f4385da54e59f0d29b7046a40976095650a2854))
* App theme variables and utility classes created ([74401ed](https://github.com/Rajesh-Royal/react-slot-bookee/commit/74401edca217b2abfbc8080b8b576430d9d9fdb4))
* cancel an already booked shift, in myshifts section ([da49a1b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/da49a1b0c8fabd3ce8cc68e65093bf21c412686f))
* create app release with standard-release ([74977cb](https://github.com/Rajesh-Royal/react-slot-bookee/commit/74977cb6c48432b92671f3531c1bf891371a35cb))
* disable already started shift ([b3783b1](https://github.com/Rajesh-Royal/react-slot-bookee/commit/b3783b1a6655c6009da7d0ce3e51e8e3a77cb457))
* disable already started shifts action, show finished text for an shift whichi s over ([d8f4c9e](https://github.com/Rajesh-Royal/react-slot-bookee/commit/d8f4c9edf978deda39e8456e3caa50206daa6ecc))
* disable overlapping shifts ([258db41](https://github.com/Rajesh-Royal/react-slot-bookee/commit/258db417cb34cead3780581f7662f37f6a1516ca))
* filter shifts by city names ([b0b75bb](https://github.com/Rajesh-Royal/react-slot-bookee/commit/b0b75bb890205aca135a78bc11ac5821dba32451))
* filter shifts by start time in ascending order ([49e81fb](https://github.com/Rajesh-Royal/react-slot-bookee/commit/49e81fb58b3b6b48e246d5cc69d05df27c67088d))
* global shifts store created with reducer and react context ([50bb523](https://github.com/Rajesh-Royal/react-slot-bookee/commit/50bb5233f5951ad39ef05b390dc83ef25a7bb83f))
* header component created ([95e4e94](https://github.com/Rajesh-Royal/react-slot-bookee/commit/95e4e94cabcc4099077491e524c3a35577262487))
* header component created ([d68ab01](https://github.com/Rajesh-Royal/react-slot-bookee/commit/d68ab0114d980423b81b924f23b922eef8499787))
* list all available shifts ([2d7f5b3](https://github.com/Rajesh-Royal/react-slot-bookee/commit/2d7f5b318654b4b6cd349e5f8f51813a143e8009))
* list all the shifts by date group, calculate their duration ([edf254e](https://github.com/Rajesh-Royal/react-slot-bookee/commit/edf254e3c0fd230c147edc7152e2e1d1a7e2478d))
* list my shifts ([3a61100](https://github.com/Rajesh-Royal/react-slot-bookee/commit/3a611005c0f690077cf56939f029f887c227cc65))
* myshifts and available shifts components created ([da8ee0f](https://github.com/Rajesh-Royal/react-slot-bookee/commit/da8ee0f497c3f8f3657675bb87e0b41825a49c4b))
* refresh api results on db data update ([44f4c5c](https://github.com/Rajesh-Royal/react-slot-bookee/commit/44f4c5c21fce88a51afea31acd3c98ceaa2d4550))
* sass support added ([4dd07bd](https://github.com/Rajesh-Royal/react-slot-bookee/commit/4dd07bd6fa5dc2b0690e727ab64279c4fea2a8ef))
* show loading spinner when user bookor cancel a shift ([d825b1b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/d825b1b77566b1bfbd9bc0c9cf93ac4119435ddb))
* toasters added to notify user for the server response ([f32128b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/f32128bc7e85f1e019f3684fd9e0b98b8289b6ed))
* typescript aliasis imports support added with craco ([c5bdc7c](https://github.com/Rajesh-Royal/react-slot-bookee/commit/c5bdc7c5649880a3fb8cf19424a4e9f968eca6b0))


### Bug Fixes

* each child in the list should have unique key props ([4f2477f](https://github.com/Rajesh-Royal/react-slot-bookee/commit/4f2477f70386346c96270ffa0f817f1ea4787ad5))
* render correct message for overlapping shifts while booking a shift ([fcf5d4f](https://github.com/Rajesh-Royal/react-slot-bookee/commit/fcf5d4fc0257dbab6aa427e303ab6bbf3b38c78b))
* replace post with get method, because server hangs on post requests - temporary fix ([56f882b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/56f882b8be7f201aeda1be2aea031000c72cdd2b))
* replace post with get request on frontend, bcz hapi server dosen't process post request ([2f8a4a5](https://github.com/Rajesh-Royal/react-slot-bookee/commit/2f8a4a545c53bf24207d8fc14bfd9e95b495b14f))
* show shift and shifts as per the number of shift counts ([9fb708f](https://github.com/Rajesh-Royal/react-slot-bookee/commit/9fb708f3f4b2d1de491d0c041f2e264d17a366b5))
* the booking status was showing overlapping incorrectly ([f2f086b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/f2f086bb2af6b0be9715c2c318d97a1accbd63a3))
* typescript type error of shiftGroups is fixed while accessing the key by string ([5f6be7b](https://github.com/Rajesh-Royal/react-slot-bookee/commit/5f6be7b6aad49b0db30c59a7cebfd05c58993980))

## 1.0.0 (2022-07-03)


### Features

* api handling ([f8228c6](https://github.com/Rajesh-Royal/react-slot-bookee/commit/f8228c687f134fd67f7d63056d74d5e09b58864f))
* prod enviornment added ([5f93a2f](https://github.com/Rajesh-Royal/react-slot-bookee/commit/5f93a2fffef3a7061c88c483a26937820cf79ee1))
* readme added ([bf81bd6](https://github.com/Rajesh-Royal/react-slot-bookee/commit/bf81bd6d504df94781479aa5f4f9c906270f24ee))
* root driver scripts created ([5dbeb49](https://github.com/Rajesh-Royal/react-slot-bookee/commit/5dbeb49e990f06a9ee4af6d1c2b8f10f1a3fe82d))


### Bug Fixes

* fixed hapi server not responding error, error was causing because of old style coded plugin register ([3f62a87](https://github.com/Rajesh-Royal/react-slot-bookee/commit/3f62a87c244d3680edc7b32fbe006d51c215de2b))

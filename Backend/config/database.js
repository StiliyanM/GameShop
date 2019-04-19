const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Game = require('../models/Game')
const User = require('../models/User')

mongoose.Promise = global.Promise;

module.exports = config => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true
  });
  const db = mongoose.connection;
  db.once('open', err => {
    if (err) {
      throw err;
    }

    seedDatabase()
      .then(() => {
        console.log('Database ready');
      })
      .catch((reason) => {
        console.log('Something went wrong');
        console.log(reason);
      });
  });

  db.on('error', reason => {
    console.log(reason);
  });
};

async function seedDatabase() {

  const users = await User.find().then((users) => users.length > 0);
  const games = await Game.find().then((games) => games.length > 0);

  if (!users) {
    await seedUsers();
  }

  if (!games) {
    await seedGames();
  }
}

async function seedUsers() {

  //seed admin

  const saltAdmin = encryption.generateSalt();
  const passwordHashAdmin = encryption.generateHashedPassword("123456", saltAdmin);

  const admin = {
    salt: saltAdmin,
    password: passwordHashAdmin,
    username: 'Admin',
    email: "admin@admin.com",
    isAdmin: "true",
    roles: ["Admin"],
    orders: [],
  }

  await User.create(admin);

  // Seed user
  const saltUser = encryption.generateSalt();
  const passwordHashUser = encryption.generateHashedPassword("123456", saltUser);

  const user = {
    salt: saltUser,
    password: passwordHashUser,
    username: 'User',
    email: "user@user.com",
    roles: ["User"],
    orders: [],
  }

  await User.create(user);
}

async function seedGames() {
  const game1 = {
    title: 'Assassin\'s Creed',
    cover: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALoAlQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAIHAf/EAEoQAAIBAwMBBQUDBwgHCQEAAAECAwAEEQUSITEGE0FRYRQiMnGBByORFUJiobHB0iQlM0VSk9HwFkNVgpKi4UZTVGNyc4OyszT/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QALREAAgECBQMEAQMFAAAAAAAAAAECAxEEEiExUQVBkRMUFaEGYbHxIjJCgfD/2gAMAwEAAhEDEQA/AKJVl7K9lotf03VLyW/9kWwCsWaIupBBJzjnw8KVaDpEut6kllDPBAzAkvO+0YHl5nnoPWul9nNEj0js52ltYriWTvbNWaWa3Ma5IkGQvxY48eTXvYquoKyep5NCnmlrsc27QaJe9n9Rayv1XftDo6HKup6EUJZWV1fymKyt5J5Au4qgycdM10L7QdNm1eM6xdXkNrHawbYYp4jF32MnCbjuJJ6ZUeFU7sxZWd7cXr6gzGK0sZLhI1l7sysuMJu8Ovh5U1KvmpZu4s6dp27Gg7Na4cY0q6OenuUrlR4XaOVGR0O1lYYIPkRTaLU9KilSVdB96NgwzqEhGQc+XpRxsda1vXU1iexULc3CTOVkQIFyPNs9BTKpJP8Ar2A4x/xFv+jutbA/5LugpGQTHjileQBnIx50/wC180WodtNTe2uY+5kudqSs/uDACkk+QIPNHLYWWmKPyXqmi3N5wTd3N0uIj/5ceCMj+02fQCsqslFN7szpptpFdltbi27v2mCSLvF3p3ikbl8xnwr1KtXbSKS4tNCla/truePTkWUpch2Y4JL+o46+oqqpVaNT1IZmcleGWViZamSoVqZKscciVamWolqVaKISNqysrKIhlZWVlYxlZWV7WCItujH/ALQWn9xL/DRlnf29j3nsXaxYBIu1xGk6hh6+7z+6qIilpCFBJJOAKI9nnP8AqJf+A18w8fWe9vB97Dp1D9fJb5J7GaV5Zu08UsrgqzyRzMzA9ckrUXcaS39fWp/+CX+Gq5DHJEG7yy3jkkyI42469CKPhlkTA/JULDx3QMc/X6UPka62t4KrpWHb7+Rt7PpZx/P1t6fcy/w1nsOlMM/lu0I8+4l/hoddZmSIxNY26Ln3gYyPp6VpPdyXaYNpFjwdITu/EfWkfU8Rz9F6fRcM+fIf7BYcH8t2/PT+Tzc/8tYLLTuf58tuM5/k83h1/NrS01W8tokjSHeqhAoaMnGw7hjj1qK21G5hgaCKAthmYsEfdluecefu/PFb5TEc/Rn0TD8PyFLZ6cpwdatwfL2eb+GpVttO8NYgOOuLeb+Gh/yndGTvDbEuysg3K5PJU8cfoj6Vu2t3zDm32jcrZWNh0x6eQA+lZdVxC7rwLLoOGfZ+QhY9MAJ/LEOAcE+zzcf8tbA6WP65hPhgQS/w0vh1K+gedhE33rbmUxtgHGOmPKvBrdzFK7GFN8pBIO4E8kjAx+lxTfLYjn6Jy/HsNw/Iz7/R1+LWYRnpmCX+GtvbdEX+u4P7iX+Gq3eTXN1PDJLEW7pcIhjYgjOeRjnggfQVNHqdxFhhYW429ALdgqj/ADn/AD0K6riOfolL8dwltn5H/t+h+Otwf3Ev8Nee36H/ALbh/uJf4ardzezTsXbS4GJOQxgY+FCNuZj/ADagYZziKQY+gPHQ/ro/KYjn6Jr8ewndPyW/2/Q/9uQf3Ev8NeHUdCHXXIP7iX+GqQ1vMWI7iQHrgRt0qF4JVXLxSKvmUIH+eR+NFdUxHIsvx/BrnyXz8p6D/t2D+4l/hrK54y1lH5PEc/RL4LC8PyXe3+z29imWWLVIkdTlWER4P40yHYTWSuDri7fLuT/jV3SPIo62G5QnjXnJ3Ov1pHPl+z3WLgFW1tGUhhgwnHvfF4+NGx/ZtreB/P8AGAOR90eP1+prpNjA6HYU6+NNYrbHgOafKN7iov4OOSfZhqext+swsrNvYd0xyeeevqa9j7AatFGqRa1GFUYUd0eBzx19T+NdWvYdo93HHlSzU500/Tbm9ZC/crlUHVm6Ko9SSB9aHpxG95WXf6OfjsJq5ORrcZOTkiM/I+NajsFq0TkprEak4HER6Yx5+QFPuy8Goabc6x2enuFa+VBe20zjh+9B3fQSZ+hrJr26OnCYQ33eWc4XU7QvmVAE5MZ/PHRuOo6c8U6pxA8bX5+kV5+xOpoysdXiMkbZU7CMcY8/QVqex+qbRnV0AUYHunpgj9hNWHU9WFvPZT2tyJLKLujOScmRJOFb6cMfQ1pfT3MOt93cGVIJ9q2kqf0YkAOUceZ6g+PTr1KpQ4B7/EcrwiuSdmtVT+tQOD+afE5oN+y18ZllfUUaRcYYqcjHSncVzP3MEUzXEV6l1DFdRSNkHOfeU+Kt6eXgc0HJqVzb2957cwWJ5Z0trpONhDsFR/I8DB6Hp16t6NPg3v6/K8C6XRL6FC8urxxp0LPx5cc/KozoF/NCu3VUeMglcAkHOc/tNG6sz6XqFrq0lubizEGycgZeAnB34+QGacWQt3tYntCht3G9CnTBOePxpo0YPsJLG1rb/RWV7O6oV2jVVC+Ww+WP2Vg7M6mGdhqwy5Bf3DyefX1NWx8DgVEQar7eHBL3tb/kVZ9A1QE51UZIwTsPNRTdn9TmjMUuqBkP5pU48P8AAVbQQBzWjmt7eHAHjKr3/YpX+iE//jIv+A17VwwD1rKHow4B7mpyXmOAf2amjjCSAgUVEm6vXiIx7tcdhwu2Yno3I6UyTHdbicE9aUW8TkE7guP10RJdXC39pah4jHMjufuyWAUp0O7x3eXFMmFK5k6kk5H186Valpc2pXVlbl1WzjmE067iGkKg7AMdMNtbP6NFWuqSTyQr3MYElvcS7iOCY2UDHPT3q2S6mHZ46ptj7wW/fYxhRxnHX186NxnBoUa72VebVtO1Owml723WSG5jnaVhNA45QNyQQeQfOvBaQ3N1cpBCw7iYJNIblxI2UUnOOcBSvB/VTqe+uTc2kKSQlpfekBT4UB5PxePAHrS63eO8u0dobaO4c3GJmT/uZNijqMnnPXjw9CmB0pCq5htUvZNH9iiaC5Ch8sQWDIwxjHgIwMA9MUNc2UH5TFo0DOgjWTLSOwBwV6dAcDqcfjT+67qS2sbuWyiSa9aNWZ13d2QrMvPHQ5APHLetC3ihZriVo7Zrm2thKJGX4xlvdBzxgj15amUkJ6UnsVua3hGqC07hn2rHOZXkZmOC4XnHhjxPiaEvGjt0vrX2NJbZEEkqu5O8OWLcEehOKsF6kO6/u+6iW4t1VULD3tuxWwT6FzQF7FAt+/3EbsYg7NsBY7ScD6Hp86opIX05p2AJlvhMwgige2KBQrhlKnx5wcjpxUelaf8AkzTIbNWBEe4khcDJYscDwGTwKPmnkFi1wGiO2LeF2k+GfOorm4aKR0badqKcgY6tjPyp1JLUV05PREewk1hXFeNctG7qEWQq4HunGQQTx6jFbJcLNFvUDknHHhTqaZOVOUVdkTComFSM1Rsc04hgXNeVikjpWVrGOl2w6eNNEiWVADxQNtGBx40xjUBRzXmHYeR2wjYcg+mKj9n98GRPh6EDpnyqZ2YdK2hlU5BBBFMYwQpDt2opUAjoOAetEJDCYjGscYjI5UKMfhWoJbgjj1qPewbHQUUG5HJZQKQVjT3Rx7o4rUpEIwpiQ4OQCoxnzqdmB4J4oaVQHVl5xRBmZ7JJDs++RDnohGQR8qWXV5aiRInhUAZCnYBj5UD2t1230GBL25jMrMNiQqQCx8T+yqjJ9omlXFzZ2zQzlLkhHaSPYsDZIGTn3ueOOKGoS13yplsohLDBOBzSiVU35CKCBwcdKa3IZwWJB4GcUrcHdk9KtHY5pN3ApNi5GxeevHWh5AOTgc0ZIBu4GagkxnnpVELmAyoAAwB5Vq3AqeRQegodwfI08bIDbZA7etaFq2dG8q2ihLHBFNc1iMHNZRggA8KyjcB0+CeBkPeL1qVJk25RhjypXaRCU7oTkjqtGGAE/CQR1FeYdoYk8T+6xwa1ebblQOPStI4lxymcURHChfPwg8YooBElyT7uD86myx5qRYQsh8vWt9gx4UxiHaD1FalCcBOc+Fey3MEUwjcruxkjPSk2t6ncQQs9plGCthhg4PgceIz+IzWZjnv2xGc3UFyiB7O0PcPzyHYbufpg1Su0d/o47LW1pZXbXV4eCCGzGCSTyVAHJ6Amrhq9xLJYve3iNJBqYYahGBlfdOwMnkQFBFczi0a7udcstKhkSQ3MoSG4HwspPx/QZJHhgigtSn9p3bszcTat2RsL+ZQLhl7uUKwIYjgnPgfQ+daXUbwsUkDKfIiqxB2ikuu0VvY6FdmHR7fbDBGVwl2vQt8z4H/Hi/arrlv7BcrLGuQTHzg8k4BFMp2IzpX1K85Tbx1oSSPd8JqVwV+VRZz0q6OUGZJM4zW3dyYxxUjK2cgmtixA5p0a5B7Kx8a3jhEfqT41uswJ6GtmcYziqJAcmRNWVo8gz1rKYBfNPWSOTKkY8c0ZLP3be4c56nHjSiC/fPvNuB6g1P7QkjbgMfWvKTO8JlvJG91TjzoizlMgy7HI6UEWjcYzg1NGm0ZRqIBmsp3ctmvWuYFbaxOaXhmAr23ia5nCeHUn0p0wCTtxcPYT299CrZkj27hyMDnBH18KTaDrSa1dSq8gUxrtwpJwCMZB46/tpn27uVkTun90IGIJ8s4GPwNc40COa3nupWjkjaVBLEccsnOQB45HIHnishrHva9bvs9rLwWdxIttMN8ZY5U+asDwf84qDQFtLmznuIFWGeFyYVf/AFbyIUYZ8QM5/CmOvaut7pqW+p90jpyJZPdG4DqpPhVMTVrhrtJLELGVxsl27Fdh0bBHJ/x+WGymv2DxcanY3BgQi3tY5ChkhG3f6hviPGDxxg0y1fVp20Hu4SW7qUuRITknIwTS681KZbeV5YoiXx3jSLlifME/DkY8PCgYdZGoRtbR2kMETN7+3JZuc9fnWyjOWly/9nNZi1vTlkiYCSMbZIy3Kn1pg67RuUZNc0aKfRb+O7sHeNio7xf2/OrppOuw3kncXGIrpRnGfdlHmtUV1ozlnHuhyuGXPQ+VYcdDj61GX5zgj0oO7kb3QenWqJk1G5tc3MULHcMEfrqAXSzJkbxz4jrULyqMlwWbwzQ73b+9jaOfAVRMLiGnnox/CspcmoSgefzrKOYFjoiRiiI4vKt44/EUTEcHpXmJHYaRx460XGmOhr0EHwqRMDpWASiISLgkUSNlhbMzlTIevPXyqr9q+0kmgxRSxRbwp3zdR7vgM+GT58cetUs9qpu1933enziIyMQIS4VkX9/zFPF3C1ZFk1aaDWryRIvfKuIlIPU46/LljQ3ajSSunx3FqZI2tUCqIzj3R0pt2d0VtOi3XLKZTwqj8wf48Ut+0u5mh0KG3hmS3hnkKzTBWZlAGQAAcnOOazdtTR1djmeuQQZjkaBHK+EpLlCQp+I+pzg+BHyr26gE1vGqxP3isVwwGCdiYxj0AP1pULaCXvLm+1MC1Ue7J7++Q9AFU/LrnjHNM31TTkt47G1i+7kjY7JNxkkPhzx6gE9cfWnUguKT3EGrHuomUyHLHjP76VaZcPbXCyrnYeGpxqMWmzrI9lLLG6n34GHAPl0+mKSq/csVOOvFa4bItup3sF1p8CQOvekZkYHop/65oeKJbdYIZpsLsBgnz8LbvgPp0I8s0Do92ltOsjR94nVlpu9quoNLfWsM/sQXDxnGxeeWxxgDBz18+hplK4JQaHmla/j+TagSrD3RKenyb/HpTWQbj+sVzeLUo7e5ZZFeSBuNuNrIfT09Ksmk6mAojtJhPCP9U3DL8vL5cj5U6ZFxHjJmoHgzU8E8c65UFT5GpNvNOmKL/Zjniso/aK9rXNY6H70Zx/1qVCTUdomSCc01iG0DiuKxa4PHuPABqSV4baAz3UqxRL8TSHAowMMeFcx7fWt5rmqn2SzX+SW7SSQyyEllGdpIBwpYjCgcnknyoWGirla7Y9oR2n1B7bRwstqwGZGjw3GMYOM8k/uq59kvs3j0C8tL25mNxdRe+wJwiOVYHA8cZHJJ5J6UP9nPZqxvYzq14zTvDc7Fw3uO8eOfUKx49Rnyx0lpRRvbQMmuwJJG1cw+1XtJFH3Oj6fcb7wlhPHHklVIHu5HOT5Crn291yTReztzc27BJ2+7ic/mE9W+gyfwrmHZg2dlb22qX6bJb7vm9plUsSd20Zbw6E/WstTRhaOdlUW4Nm/eyWEJfkATW4dc/wC8M5BH7aBZxJee0XAlkYncRnqfmauGrr7XPbd3h9zZLId6vzuJ469TVPvZGS5ixgEKOnntH76vYS4VLfXU8bh41HkWYkgZB4HT69cUhm3GVixyT1JprNcF8FuONoxQF6d5VwuByOPE0DN30JtJwzsjdccZp/pOs3+g3LXGnspbBDRPyjg+Yqs2LNFco2Dg8U6nwEqUtJHdRSlSswufTrXVLV9SsdywM2JUC5a3c+DY/N6YND6Bod9ea1BAkTFEPeSMvVVHh9eB9ad/Z9ZXSao1+rGHTvhmVhxcfo48RnnNdELaRatHJp0PdqCePEcYKk/nDgda6IRbPPqOMXYRmz7tt3sxQj9GsIPkfwplc3/e5wWx4ZoCSQN1Y1ZwsQUm2Q4rK9JyeM/SspbIc6LYzxkOFb4Tg8eNEG7wcA1StL11NPgnkeId2oLuy8+IHT60Z/pppOxZXivthOA4tjtJ8gc81wucVuzpo4WvWjmpxbW3+y2R3O7zzRSBWYMyqcc9OpqnRdtdHCo+y+ETsFEhtsJk/pE4qwpqcctpb3FsQ0cwDLn+z1rZk9hqmHrUVepGyGSIkUYSJVRB0VVAA+grVq170HwPrS7Wte0zQrfv9TuViUjKp1d/kPGsSSb2Of8A25XLC30iwj3ZmkklO0ZztCgD/mNbXWly6d2f7P29zgPaQZmUjOJXBYg/ViKZaGF7a66nae6tu606y+60+GTlpGBJMh8MA4x6j0FLftO1UabewllVYpxhm6ncD5fKmjqyknZKPBSL+zmtYxLbF07xmyAfP0+VU+4uJZbjLkFg2M46+FXi6u0mhVk94blZRnPHzqkmP7+TPVZMfrqzZIcJYBrbczAOGwoqfRtFgv8AW4bW7dlgkkUMwxnBODioJJf5OUJ/PJr3R9Y7jXrByFfEyA7xwBmsY6wex3Z6GHuxpEDDGC0g3Of9481XP9CrO1uHmuZpJrUP93DjHyBbOT+qrfJd3z9BD+GM0nuo5i5M0iFic43GkbQsZzXcge6jVe7hiCIowoGAPoKg78njp8q9ki98jvUJ5PAGBQbKxVmDtx4gU0ZyFcVuGK5PNbEEjOCR40rIzk95kgc+lRd8YZwUlZiR0JyKop8i5eBwLgKPd249TWVpbzWxUme3VnJ5Ph9KymuKQRzbYbo7VcCPdtbo2HU4PpVm7Y3Edz2D0C59mhgieXcYIBhQMNkCqHaTnM6s4O+2d+mOAy1adX1nT5OxfZ+yhuI5bq0lDywjqAAfPivLbsnd9j6jplJyp05RV3nf7HQtR40m+eeBG0L8lgxwrGd+7ByNvXpt+VU/Sr500rToVxiO3i6n9BTTqftV2cje71lNWEss1kIFscc7hk9PrjniqJBeGCG3QMOLeD/8lqjazKzODEUqkcO80WtV+nZ3L8NTZY2ZY2kcAkLnkkeFcr0PQbztTcz6z2hubiOEvhsfHKQcFVJ+FR06fLzqypqsgxtfxzW0F4I4FiQKsUfCKPAU10edGo4os0V5b6XpkFvbIESJAkUXgABXI/tQ1P8AKOqQxrJuFugDH9InJq13N+0jFmbJP6hVL7RaSri5urdhub7xkPGMdSKMWGLu3crtndzQxNGDui67fFflWsTmS6ZgTlmzUlkEETOBl1PHqKljtYRIzmdvPATj8c/uq1w2B5rh9jIvu88nzoeAlZVZeShBoyaGEqSO9B8CWGPwx++ptJ06W9OxMD3vekI4Ws2ZK50fRLyK9sraaKVmkIdZcHxAyP1U+iMP5DI90s8bMxI5LZPNVLTEg022gggDcM29j1diOv4YplFqUfsYt8HdsZfrzU82oriNrQxjTFQYJdTuz4kjxqsxjUNQkNlprR20SH764kB6nooAyWPoKYW2oRCzVC+1gAvI8a97JX8NreqZWX+kZuvXIxXVh3Fy1JtNAbaVqWitCbto7iymYr38QI2n1BAPHGQQD40lYLHqDRuMMrspHkRXTO12r6a+nvmWMLIyswRQANueg/tHOPoK5XLdxya5JJLhA0rs2egJpqzVlyGPcZ+0Y6kZ+deUJLNb7uJY/wDiFZUsxrE3ZPUrHTe0bXOrSiG2W2kjw9r3o5A2nb4jIq+L2v7IFXCahaEnhc6Njbz16c8cfWuLF2feXYtx4nPjWjEhhg+FQVi+eUdmduHarsiYdkl/aq+44ZdJ5xxjjHHnVO7Qajb3muXc9i4a1JQRssXdggRqpwvhyDVFFNIye6Xn8399CSuZzk92WGK44HP41MbohGFKYSSgyaKkA7tDgZ/61A1jeS5GPiBoKedZEaOQqUYEMCeoNbSeNCN1PzqsBWhdIsNurqYLViPhYoeR8wRQqTmXL90oUHhUPA9Kl1npH/vfuoez/oPrVkFGlxKSNowXJ4FWHSZliSKKNSEDAE+Z8TVaP/8ASPlTSwJDpgn4h+2s9hRy95lYuT7zt+yvLK7973sn7skUrlJ9mh5PxP8AsoSKR+8jG9sbDxn0NKkG5dNCm0e4izqMzxSxyKwCoTvTB4BHju28mj/aOxO6B4vaiN3vD7zkZUHJxkHG7gZ8KoOlE+1Hk/B/hW1t8EHzP/2pkAuktz2JZJHaS5kTe3xCQuDx8OeNvxdfpSPVrvszI9+bKwuEm71RbPLO3K4bexAJHBCY/wDUeOKQt/QN/wC4ahl/pPrRMbvjjDVlQmsrGP/Z',
    publisher: 'Ubisoft',
    genre: 'action-adventure',
    year: 2018,
    price: 20,
    description: 'Assassin\'s Creed is an action-adventure stealth video game franchise created by Patrice Désilets, Jade Raymond and Corey May, developed and published by Ubisoft using the game engine Anvil Next. It depicts in the centuries-old struggle, now and then, between the Assassins, who fight for peace with free will, and the Templars, who desire peace through control. The series features historical fiction, science fiction and characters, intertwined with real-world historical events and figures. For the majority of time players would control an Assassin in the past history, while they also play as Desmond Miles or an Assassin Initiate in the present day, who hunt down their Templar targets.    ',
  };
  const game2 = {
    title: 'Spider-Man',
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg',
    publisher: 'Sony',
    genre: 'action-adventure',
    year: 2018,
    price: 15,
    description: `Marvel's Spider-Man[a] is a 2018 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment. Based on the Marvel Comics superhero Spider-Man, it is inspired by the long-running comic book mythology and adaptations in other media. In the game's main storyline, the super-human crime lord Mr. Negative orchestrates a plot to seize control of New York City's criminal underworld. When Mr. Negative threatens to release a deadly virus, Spider-Man must confront him and protect the city while dealing with the personal problems of his civilian persona, Peter Parker.

    Gameplay is presented from the third-person perspective with a primary focus on Spider-Man's traversal and combat abilities. Spider-Man can freely move around New York City, interacting with characters, undertaking missions, and unlocking new gadgets and suits by progressing through the main story or completing tasks. Outside the story, the player is able to complete side missions to unlock additional content and collectible items. Combat focuses on chaining attacks together, and using the environment and webs to incapacitate numerous foes while avoiding damage.
    
    Development of Marvel's Spider-Man, the first licensed game by Insomniac in its then-22 year history, began in 2014 and took approximately four years. Marvel gave Insomniac the choice of using any character from their catalogue to work on; Spider-Man was chosen both for his appeal to the employees and the similarities in traversal gameplay to their previous game Sunset Overdrive (2014). The game design took inspiration from the history of Spider-Man across all media but both Marvel Comics and Insomniac wanted to tell an original story that was not linked to an existing property, creating a unique universe (known as Earth-1048) that has since appeared in novels, merchandise, movies, and comics.
    
    `,
  };
  const game3 = {
    title: 'God of War',
    cover: 'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',
    publisher: 'Sony',
    genre: 'action-adventure',
    year: 2018,
    price: 9.99,
    description: `God of War[a] is an action-adventure video game developed by Santa Monica Studio and published by Sony Interactive Entertainment (SIE). Released on April 20, 2018, for the PlayStation 4 (PS4) console, it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. Unlike previous games, which were loosely based on Greek mythology, this installment is loosely based on Norse mythology, with the majority of it set in ancient Norway in the realm of Midgard. For the first time in the series, there are two main protagonists: Kratos, the former Greek God of War who remains as the only playable character, and his young son Atreus; at times, the player may passively control him. Following the death of Kratos' second wife and Atreus' mother, they journey to fulfill her promise to spread her ashes at the highest peak of the nine realms. Kratos keeps his troubled past a secret from Atreus, who is unaware of his divine nature. Along their journey, they encounter monsters and gods of the Norse world.
    `,
  };

  const games = [game1, game2, game3];

  await Game.insertMany(games);
}
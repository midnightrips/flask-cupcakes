$flavor = $('#flavor');
$size = $('#size');
$image = $('#image');
$rating = $('#rating');

BASE_URL = 'http://localhost:5000/api';

function generateCupcakeHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.ating}
            </li>
            <img src="${cupcake.image}" alt="cupcake image">
        </div>
    `;
}

async function showCupcakes() {
    const res = await axios.get(`${BASE_URL}/cupcakes`);
    for (let cupcakeData of res.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('#cupcakes').append(newCupcake);
    }

}


async function addCupcake(e) {
    e.preventDefault();
    let flavor = $flavor.val();
    let size = $size.val();
    let rating = $rating.val();
    let image = $image.val();

    const newCupcakeRes = await axios.post(`${BASE_URL}/cupcakes`, { flavor, rating, size, image });

    let newCupcake = $(generateCupcakeHTML(newCupcakeRes.data.cupcake));
    $('#cupcakes').append(newCupcake);
    $('#new-cupcake').trigger('reset');
}

$('#submit').on('click', addCupcake);

$(showCupcakes);
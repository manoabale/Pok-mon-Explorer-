async function searchPokemon() {
  const name = document.getElementById("pokemonInput").value.trim().toLowerCase();
  if (!name) return alert("Please enter a Pokémon name");

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) throw new Error("Pokémon not found");

    const data = await res.json();
    const container = document.getElementById("pokemonContainer");

    const types = data.types.map(t => t.type.name).join(", ");
    const abilities = data.abilities.map(a => a.ability.name).join(", ");

    container.innerHTML = `
      <div class="pokemon-card">
        <img src="${data.sprites.front_default}" alt="${data.name}" />
        <h2>${data.name.toUpperCase()}</h2>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type:</strong> ${types}</p>
        <p><strong>Abilities:</strong> ${abilities}</p>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("pokemonContainer").innerHTML = "<p>Pokémon not found or API error.</p>";
  }
}

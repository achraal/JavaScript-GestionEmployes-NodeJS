const apiUrl = 'http://localhost:3000/employes';

// Ajouter un employé
function ajouterEmploye() {
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const poste = document.getElementById('poste').value;
    const salaire = document.getElementById('salaire').value;
    const telephone = document.getElementById('telephone').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, poste, salaire, telephone })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("empForm").reset();
        alert(data);
        afficherEmployes();
    });
}

// Afficher tous les employés
function afficherEmployes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const empList = document.getElementById('empList');
            empList.innerHTML = ''; // Vider la liste avant d'ajouter les nouvelles données
            let totalSalaires = 0; // Initialiser le total des salaires

            data.forEach(employe => {
                empList.innerHTML += `
                <tr class="hover:bg-gray-50 transition-colors duration-200">
                    <td class="border border-gray-300 px-4 py-2">${employe.nom}</td>
                    <td class="border border-gray-300 px-4 py-2">${employe.email}</td>
                    <td class="border border-gray-300 px-4 py-2">${employe.poste}</td>
                    <td class="border border-gray-300 px-4 py-2 text-right">${employe.salaire}.00 Dhs</td>
                    <td class="border border-gray-300 px-4 py-2">+212 ${employe.telephone}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-200" onclick="supprimerEmploye(${employe.id})">Supprimer</button>
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                        <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition duration-200" onclick="modifierEmploye(${employe.id}, '${employe.nom}', '${employe.email}', '${employe.poste}', ${employe.salaire}, '${employe.telephone}')">Modifier</button>
                    </td>
                </tr>`;
                    
                
                // Ajouter le salaire au total
                totalSalaires += parseFloat(employe.salaire);
            });

            // Mettre à jour le tfoot avec le nombre total d'employés et le total des salaires
            const totalList = document.getElementById('totalList');
            totalList.innerHTML = `
            <tr class="total bg-gray-100 font-semibold text-gray-700">
                <td colspan="2" class="border border-gray-300 px-4 py-3 text-left">
                    Total Employés: ${data.length}
                </td>
                <td colspan="3" class="border border-gray-300 px-4 py-3 text-right">
                    Total Salaires: ${totalSalaires.toFixed(2)} Dhs
                </td>
                <td colspan="2" class="border border-gray-300"></td>
            </tr>
        `;        
        });
}

// Supprimer un employé
function supprimerEmploye(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(response => response.text())
        .then(data => {
            alert(data);
            afficherEmployes();
        });
}

// Supprimer tous les employés
document.getElementById('reset').addEventListener('click', function(event) {
    event.preventDefault(); 
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les employés ?")) {
        fetch(apiUrl, { method: 'DELETE' }) 
            .then(response => response.text())
            .then(data => {
                alert(data);
                afficherEmployes();
            });
    }
});

// Modifier un employé
function modifierEmploye(id, nomActuel, emailActuel, posteActuel, salaireActuel, telephoneActuel) {
    const nom = prompt("Nouveau nom:", nomActuel);
    const email = prompt("Nouvel email:", emailActuel);
    const poste = prompt("Nouveau poste:", posteActuel);
    const salaire = prompt("Nouveau salaire:", salaireActuel);
    const telephone = prompt("Nouveau téléphone:", telephoneActuel);

    // Vérification si les valeurs sont nulles (si l'utilisateur annule le prompt)
    if (nom === null || email === null || poste === null || salaire === null || telephone === null) {
        alert("Modification annulée.");
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, poste, salaire, telephone })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        afficherEmployes();
    });
}

// Appeler afficherEmployes au chargement de la page
window.onload = afficherEmployes;
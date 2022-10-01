const setEditModal = (name) => {
    name=String(name);
    console.log(name);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/contact/" + name ,  false);
    xhttp.send();

    const contact = JSON.parse(xhttp.responseText);

    const x = `
    <form action="http://localhost:3000/contact/:${name}" method="POST">
    <div class="form-group">
        <label for="exampleInputPassword1">Name</label>
        <input class="form-control" name="contact_name" value='${contact.contact_name}'>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Profession</label>
        <input class="form-control" name="contact_profession" value='${contact.contact_profession}'>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Telephone Number</label>
        <input class="form-control" name="contact_tel_number" value='${contact.contact_tel_number}'>
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Mobile Number</label>
        <input  class="form-control" name="contact_mobile_number" value='${contact.contact_mobile_number}'>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
`

document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
}


const deleteContact = (name) => {
    console.log(name)
    name=String(name);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/contact/" + name, false);
    xhttp.send();
    document.getElementById('contacts').innerHTML ="";
    loadContacts();

}

const loadContacts = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/contact", false);
    xhttp.send();

    const contacts = JSON.parse(xhttp.responseText);

    for (let contact of contacts) {
        mycontact=String(contact.contact_name);
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${contact.contact_name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${contact.contact_profession}</h6>
                        <div>Telephone: ${contact.contact_tel_number}</div>
                        <div>Mobile: ${contact.contact_mobile_number}</div>
                        <hr>
                        <button onclick="deleteContact('${mycontact.toString()}');" type="button" class="btn btn-primary" data-toggle="modal">
					    Delete</button>
                        <button onclick="setEditModal('${mycontact.toString()}');" types="button" class="btn btn-primary" data-toggle="modal">  Edit
                      </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('contacts').innerHTML = document.getElementById('contacts').innerHTML + x;
    }
}

loadContacts();
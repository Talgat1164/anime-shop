console.log('Hello, World!');
const btn = document.getElementById('add');

function addUser(){
    console.log('click');
    $('.table').append(
        `<td>#</td>
          <td style="display: none"><input type="text" name="id" placeholder="Enter a name"></td>
          <td><input type="text" name="name" placeholder="Name"></td>
          <td><input type="text" name="email" placeholder="Email"></td>
          <td><input type="text" name="password" placeholder="Password"></td>
          <td><input type="text" name="country" placeholder="Country"></td>
          <td><input type="submit" value="Create" class="change"></td></form>
          <td style="border: 0"></td>`
    );
};

btn.addEventListener('click', function(){
    addUser();
});

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th class="text-right">Size</th>
        </tr>
    </thead>
    <tbody>
        {{#each files}}
        <tr>
            <td>{{ name }}</td>
            <td class="text-right">{{ bytes size }}</td>
        </tr>
        {{/each}}
    </tbody>
</table>

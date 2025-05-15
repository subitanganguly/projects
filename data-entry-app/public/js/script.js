$(document).ready(function() {
    // Load existing data when page loads
    loadData();

    // Form submission handler
    $('#dataForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        $.ajax({
            url: '/submit-form',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    alert('Data saved successfully!');
                    $('#dataForm')[0].reset();
                    loadData();
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                alert('An error occurred: ' + error);
            }
        });
    });
});

function loadData() {
    $.get('/get-entries', function(data) {
        const tableBody = $('#dataTableBody');
        tableBody.empty();
        
        if (data.length === 0) {
            tableBody.append('<tr><td colspan="5" class="text-center">No data available</td></tr>');
            return;
        }
        
        data.forEach(entry => {
            const row = `
                <tr>
                    <td>
                        ${entry.image ? 
                            `<img src="${entry.image}" alt="${entry.name}" class="img-thumbnail" style="width: 50px; height: 50px;">` : 
                            'No image'}
                    </td>
                    <td>${entry.name}</td>
                    <td>${entry.age}</td>
                    <td>${entry.mobile}</td>
                    <td>${entry.address}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }).fail(function() {
        $('#dataTableBody').html('<tr><td colspan="5" class="text-center text-danger">Error loading data</td></tr>');
    });
}
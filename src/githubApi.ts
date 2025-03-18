// githubApi.ts
export const pushDataToGitHub = async (jsonData: any) => {
    const GITHUB_USERNAME = 'UrsacheMihai'; // Replace with your GitHub username
    const GITHUB_REPO = 'portable-prodapp'; // Replace with your repository name
    const FILE_PATH = 'data.json'; // The file to update (can be in the root or public folder)
    const BRANCH = 'main'; // Change if using a different branch
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN; // Get the token from the environment variables

    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${FILE_PATH}`;

    // Step 1: Get the current file SHA (needed for updating the file)
    let sha = '';
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        if (response.ok) {
            const fileData = await response.json();
            sha = fileData.sha; // Required for updating an existing file
        }
    } catch (error) {
        console.error('Error getting file SHA:', error);
    }

    // Step 2: Prepare the commit payload
    const commitData = {
        message: 'Update data.json file',
        content: btoa(JSON.stringify(jsonData, null, 2)), // Convert JSON to Base64
        branch: BRANCH,
        sha: sha || undefined, // Include SHA if updating
    };

    // Step 3: Push the file to GitHub
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify(commitData),
    });

    if (response.ok) {
        console.log('File updated successfully!');
    } else {
        console.error('Error pushing file:', await response.json());
    }
};

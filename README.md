# Web Tools Container

This project is a simple web development tool designed to assist with string operations. It includes several tools that can be used directly from your web browser. 

## Tools Included

1. **Proxy to IP Converter**
   - **Functionality**: Converts a proxy string to its corresponding IP address.
   - **Input Format**: `IP:Port:Username:Password`
   - **Example**: 
     - Input: `123.444.82.7:123:xyze:pass1`
     - Output: `123.444.82.7`

2. **Line Counter**
   - **Functionality**: Counts the number of lines in the text currently stored in the clipboard.
   - **Example**: 
     - Clipboard Content:
       ```
       abc
       12
       d
       ```
     - Output: `3`

3. **Multiple Copy**
   - **Functionality**: Allows you to copy multiple pieces of text and combines them into a single clipboard entry, separated by new lines.
   - **Example**: 
     - Input: `"xa", "123p", "2 k"`
     - Output in Clipboard:
       ```
       xa
       123p
       2 k
       ```

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/web-tools-container.git
   ```

2. Navigate to the project directory:
   ```
   cd web-tools-container
   ```

3. Open `src/index.html` in your web browser to access the tools.

## Future Enhancements

This project is designed to be extensible. Additional tools can be added in the `src/tools` directory, and the main interface can be updated in `src/index.html` to include new functionalities.

## License

This project is open-source and available for modification and distribution under the MIT License.
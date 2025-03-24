const assertEquals = (actual, expected, testName) => {
  if (actual === expected) {
    console.log(`${testName} completed, no errors found.`);
  } else {
    console.log(
      `${testName} failed, expected output: ${expected} vs output: ${actual}`
    );
  }
};

console.log(assertEquals(sum(2, 3), 6, "Sum test"));

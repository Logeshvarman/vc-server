const { ProofOfDaoRole } = require("./vcHelpers/ProofOfDaoRole");

const credentialSubject = {
  role: {
    $in: [4, 5],
  },
};

const proofRequest = ProofOfDaoRole(credentialSubject);

module.exports = {
  proofRequest,
};

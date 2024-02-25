module.exports = {

  ProofOfDaoRole: (credentialSubject) => ({
    id: 1,
    circuitId: "credentialAtomicQuerySigV2",
    query: {
      allowedIssuers: ["*"],
      type: "ProofOfDaoRole",
      context:
        "https://raw.githubusercontent.com/0xPolygonID/tutorial-examples/main/credential-schema/schemas-examples/proof-of-dao-role/proof-of-dao-role.jsonld",
        credentialSubject,
    },
  }),
};

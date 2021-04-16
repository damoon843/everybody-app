package edu.brown.cs.everybody.utils;

import edu.brown.cs.everybody.utils.KosarajusAlgorithm;

import org.junit.Before;
import org.junit.Test;

import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class KosarajusTest {
    private KosarajusAlgorithm kos;

    public KosarajusTest() {

    }


    //@Test
    public void basicTest() throws ExecutionException, SQLException, URISyntaxException {
        /*
        for a database with a single user--edge case

        Follo
         */
        //ID USER NUMBER 1
        List<Integer> con_comp=  kos.findSCC(1);



    }
}
 (export "testDo" (func $testDo))
 (export "testWhile" (func $testWhile))
 (export "testWhileEmpty" (func $testWhileEmpty))
 (export "testFor" (func $testFor))
 (func $testDo (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (block $break$1.1
   (loop $continue$1.1
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (br_if $continue$1.1
     (i32.lt_u
      (get_local $1)
      (get_local $0)
     )
    )
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $testWhile (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (block $break$1.1
   (loop $continue$1.1
    (if
     (i32.lt_u
      (get_local $1)
      (get_local $0)
     )
     (block
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
      (br $continue$1.1)
     )
    )
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $testWhileEmpty (type $v)
  (block $break$1.1
   (loop $continue$1.1
    (if
     (i32.const 0)
     (block
      (nop)
      (br $continue$1.1)
     )
    )
   )
  )
  (block $break$2.1
   (loop $continue$2.1
    (if
     (i32.const 1)
     (block
      (nop)
      (br $continue$2.1)
     )
    )
   )
  )
 )
 (func $testFor (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (block $break$1.1
   (set_local $1
    (i32.const 0)
   )
   (loop $continue$1.1
    (if
     (i32.lt_u
      (get_local $1)
      (get_local $0)
     )
     (block
      (nop)
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
      (br $continue$1.1)
     )
    )
   )
  )
  (set_local $2
   (i32.const 0)
  )
  (block $break$2.1
   (loop $continue$2.1
    (if
     (i32.lt_u
      (get_local $2)
      (get_local $0)
     )
     (block
      (nop)
      (set_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (br $continue$2.1)
     )
    )
   )
  )
  (block $break$3.1
   (set_local $2
    (i32.const 0)
   )
   (loop $continue$3.1
    (if
     (i32.lt_u
      (get_local $2)
      (get_local $0)
     )
     (block
      (nop)
      (set_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (br $continue$3.1)
     )
    )
   )
  )
  (block $break$4.1
   (set_local $2
    (i32.const 0)
   )
   (loop $continue$4.1
    (if
     (i32.lt_u
      (get_local $2)
      (get_local $0)
     )
     (block
      (set_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (br $continue$4.1)
     )
    )
   )
  )
  (block $break$5.1
   (loop $continue$5.1
    (br $break$5.1)
    (br $continue$5.1)
   )
  )
  (return
   (get_local $2)
  )
 )

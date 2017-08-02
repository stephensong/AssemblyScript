 (export "test" (func $test))
 (export "memory" (memory $0))
 (func $A#a (type $iv) (param $0 i32)
 )
 (func $test (type $iv) (param $0 i32)
  (call $A#a
   (get_local $0)
  )
 )
